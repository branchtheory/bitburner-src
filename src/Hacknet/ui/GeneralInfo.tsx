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
            Here you can purchase Hacknet Nodes to passively earn money. Hacknet Nodes are the the machines that the
            Hacknet runs on, specialised rigs that can share computing power anonymously. Hackers who use the network
            distribute a small percentage of their profits to the owners of Hacknet Nodes.
          </Typography>
          <br />
          <Typography>
            Each Node can be upgraded to increase its computing power and the profit you make from it.
          </Typography>
        </>
      ) : (
        <>
          <Typography>
            Here you can purchase Hacknet Servers, the upgraded version of the Hacknet Node. Hacknet Servers earn you
            hashes by performing computations and operations on the network. Hashes can be spent on a variety of
            upgrades.
          </Typography>
          <br />
          <Typography>
            The number of hashes you can store is limited by the size of your cache. If your cache gets full, surplus
            hashes will be automatically sold for money.
          </Typography>
          <br />
          <Typography>
            Hacknet Servers can be used to run scripts, just like regular servers. However, running scripts on a Hacknet
            Server reduces its hash rate by the percentage of its RAM you use.
          </Typography>
        </>
      )}
    </>
  );
}
