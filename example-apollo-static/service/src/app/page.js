import { getClient } from '../lib/apollo-client';
import { gql } from '@apollo/client';

const GET_SERVER_INFO = gql`
  query GetServerInfo {
    info {
      namespace
      containerName
      stage
      computeType
      local
    }
  }
`;

export default async function Home() {
  const { data } = await getClient().query({
    query: GET_SERVER_INFO,
  });

  return (
    <div className="container">
      <img src="/images/logo.png" alt="Logo" className="logo" />
      <div className="info">Namespace: {data.info.namespace}</div>
      <div className="info">Container Name: {data.info.containerName}</div>
      <div className="info">Stage: {data.info.stage}</div>
      <div className="info">Compute Type: {data.info.computeType}</div>
      <div className="info">Local: {data.info.local}</div>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          text-align: center;
          font-family: "Roboto Mono", monospace;
        }
        .logo {
          max-width: 300px;
          margin-bottom: 30px;
        }
        .info {
          margin: 10px 0;
          padding: 10px;
          background: #fff;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
