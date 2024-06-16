const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5M2RiNjgwMS0zZDJkLTRkYzMtOTljMy02MTA1NGNjMmExMzIiLCJlbWFpbCI6ImFyeWFuc2F0aWphMjAwM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiN2NjM2I0N2FlZDQ2MTg2Nzk1MDIiLCJzY29wZWRLZXlTZWNyZXQiOiJjNjY5YTBlM2E2YjM0Mjk0YzE3NmExMDRiMjdlMGI5YTZlY2VhZTYyMDM0ZDMxYmYyNmU0MDI4Y2EzMTJjNDllIiwiaWF0IjoxNzE4NTI1MTkyfQ.ApssqHra_-2B1KQQf8UZMU2yu_vRdKHuH5P2Dgx-E_M"
// const JWT = process.env.PINATA_JWT;

export const pinFileToIPFS = async (formData) => {
    try{
        console.log(JWT);
        const response = await fetch(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${JWT}`
                },
                body: formData
            }
        )
        const data = await response.json();
        return data;
    } catch(err){
        console.log(err);
    }
}