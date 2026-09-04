/**
 * React Component for the Hacknet Node UI
 *
 * Displays general information about Hacknet Nodes
 */
import React from "react";
import Typography from "@mui/material/Typography";

interface IProps {
  hasHacknetServers: boolean;
}

export function GeneralInfo(props: IProps): React.ReactElement {
  return (
    <>
      <Typography>
        The Hacknet is a global, decentralized network of machines. It is used by hackers around the world to perform
        cyber attacks without the fear of being traced.
      </Typography>
      <br />
      {!props.hasHacknetServers ? (
        <>
          <Typography>
            Here you can purchase Hacknet Nodes, specialised machines that contribute resources and computing power to the Hacknet. This allows you to take
            a small percentage of profits from hacks performed on the network.
            <br />
            <br />
            Purchasing Hacknet Nodes will earn you money passively. You can upgrade Nodes to increase their earnings.
          </Typography>
        </>
      ) : (
        <>
          <Typography>
            Here you can purchase Hacknet Servers, the upgraded version of the Hacknet Node. Hacknet Servers earn you
            hashes by performing computations and operations on the network. Hashes can be spent on a variety of
            upgrades.
            <br />
            <br />
            The number of hashes you can store is limited by the size of your cache pool. If you fill your caches, surplus
            hashes will automatically be sold for money.
            <br />
            <br />
            Hacknet Servers can be used to run scripts, just like regular servers. However, running scripts on a Hacknet
            Server reduces its hash rate by the percentage of its RAM you use.
          </Typography>
        </>
      )}
    </>
  );
}
