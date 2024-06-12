const hre = require("hardhat");

(async() => {
    const chatapp = await hre.ethers.deployContract('chatapp');
    await chatapp.waitForDeployment();
    console.log(`Contract deployed to ${chatapp.target}`)
})()
.then(()=>{
    console.log('Contract Deployed Successfully....');
    process.exit(0);
})
.catch((err)=>{
    console.log('Something Went Wrong');
    console.log(err);
    process.exit(1);
})