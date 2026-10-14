import { CONSTANTS } from "../Constants";
import { Player } from "@player";
import { BaseServer } from "../Server/BaseServer";
import { Server } from "../Server/Server";
import { RunningScript } from "./RunningScript";
import { getWeakenEffect, processSingleServerGrowth } from "../Server/ServerHelpers";
import { GetServer } from "../Server/AllServers";
import { formatPercent } from "../ui/formatNumber";
import { workerScripts } from "../Netscript/WorkerScripts";
import { scriptKey } from "../utils/helpers/scriptKey";

import type { ScriptFilePath } from "../Paths/ScriptFilePath";

export function calculateTotalScriptOfflineProduction(
  production: number,
  playerPlaytimeSinceLastAug: number,
  timePassed: number,
): number {
  let gain = (production / playerPlaytimeSinceLastAug) * timePassed * CONSTANTS.OfflineHackingIncome;
  if (!Number.isFinite(production)) {
    gain = 0;
  }
  return gain;
}

export function scriptCalculateOfflineProduction(
  runningScript: RunningScript,
  playerLastUpdate: number,
  playerPlaytimeSinceLastAug: number,
): void {
  //The Player object stores the last update time from when we were online
  const thisUpdate = new Date().getTime();
  const lastUpdate = playerLastUpdate;
  const timePassed = Math.max((thisUpdate - lastUpdate) / 1000, 0); //Seconds

  // EXP AND MONEY GAIN

  const expGain = calculateTotalScriptOfflineProduction(
    runningScript.onlineExpGained,
    playerPlaytimeSinceLastAug,
    timePassed,
  );
  const moneyGain = calculateTotalScriptOfflineProduction(
    runningScript.onlineMoneyMade,
    playerPlaytimeSinceLastAug,
    timePassed,
  );
  Player.scriptProdSinceLastAug += moneyGain;

  // Update script stats
  runningScript.offlineRunningTime += timePassed;
  runningScript.offlineExpGained += expGain;
  runningScript.offlineMoneyMade += moneyGain;

  // dataMap entry schema: [MoneyStolen, NumTimesHacked, NumTimesGrown, NumTimesWeaken]
  // GROW
  for (const [hostname, [, , growCount]] of runningScript.dataMap.entries()) {
    if (growCount == 0 || growCount == null) {
      continue;
    }
    const server = GetServer(hostname);
    if (server == null) {
      continue;
    }
    const timesGrown = Math.round(((0.5 * growCount) / runningScript.onlineRunningTime) * timePassed);
    runningScript.log(`Called on ${server.hostname} ${timesGrown} times while offline`);
    const host = GetServer(runningScript.server);
    if (host === null) {
      throw new Error("getServer of null key?");
    }
    if (!(server instanceof Server)) {
      throw new Error("trying to grow a non-normal server");
    }
    const growth = processSingleServerGrowth(server, timesGrown, host.cpuCores);
    runningScript.log(`'${server.hostname}' grown by ${formatPercent(growth - 1, 6)} while offline`);
  }

  // WEAKEN
  for (const [hostname, [, , , weakenCount]] of runningScript.dataMap.entries()) {
    if (weakenCount == 0 || weakenCount == null) {
      continue;
    }
    const serv = GetServer(hostname);
    if (serv == null) {
      continue;
    }

    if (!(serv instanceof Server)) throw new Error("trying to weaken a non-normal server");
    const host = GetServer(runningScript.server);
    if (host === null) throw new Error("getServer of null key?");
    const timesWeakened = Math.round(((0.5 * weakenCount) / runningScript.onlineRunningTime) * timePassed);
    runningScript.log(`Called weaken() on ${serv.hostname} ${timesWeakened} times while offline`);
    const weakenAmount = getWeakenEffect(runningScript.threads, host.cpuCores);
    serv.weaken(weakenAmount * timesWeakened);
  }
}

//Returns a RunningScript map containing scripts matching the filename and
//arguments on the designated server, or null if none were found
export function findRunningScripts(
  path: ScriptFilePath,
  args: (string | number | boolean)[],
  server: BaseServer,
): Map<number, RunningScript> | null {
  return server.runningScriptMap.get(scriptKey(path, args)) ?? null;
}

//Returns a RunningScript object with the given pid, or null
export function findRunningScriptByPid(pid: number): RunningScript | null {
  const ws = workerScripts.get(pid);
  if (!ws) return null;
  return ws.scriptRef;
}
