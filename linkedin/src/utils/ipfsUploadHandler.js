import ipfsClient from "./ipfs";

export const uploadFileToIpfs = async (file) => {
    try {   
        const added = await ipfsClient.add(file);
        const url = `https://${ipfsClient.opts.host}/ipfs/${added.path}`;
        return url;
    } catch(err){
        console.log(err);
    }
}