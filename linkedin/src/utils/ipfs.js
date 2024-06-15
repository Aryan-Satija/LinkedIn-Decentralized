import {create} from 'ipfs-http-client';

const ipfsClient = create({
    host: 'ipfs.io',
    port: 443,
    protocol: 'https'
})

export default ipfsClient;
