const { expect } = require("chai");

describe("chatapp", () => {
    let owner, customer; 
    let chatapp;
    beforeEach(async () => {
        [owner, customer] = await ethers.getSigners();
        const chatapp_contract_factory = await ethers.getContractFactory("chatapp");
        chatapp = await chatapp_contract_factory.deploy();
    });

    describe("deployment", () => {
        it("sets up owner", async () => {
            expect(await chatapp.owner()).to.equal(owner.address);
        });
    });

    describe("friend request", () => {
        beforeEach(async () => {
            const transaction = await chatapp.connect(owner).sendFriendRequest(customer.address);
            await transaction.wait();
        });
        
        it("request sent", async () => {
            const result = await chatapp.getAllRequests(owner.address);
            expect(result[0].from).to.equal(owner.address);
            expect(result[0].to).to.equal(customer.address);
        });

        it("request received", async () => {
            const result = await chatapp.getAllRequests(customer.address);
            expect(result[0].from).to.equal(owner.address);
            expect(result[0].to).to.equal(customer.address);
        });

        it("request reject", async () => {
            await chatapp.connect(customer).rejectFriendRequest(owner.address);
            const result = await chatapp.getAllRequests(customer.address);
            expect(result.length).to.equal(0);
        });

        it("request accept", async () => {
            await chatapp.connect(customer).acceptFriendRequest(owner.address);
            const result = await chatapp.getAllRequests(customer.address);
            expect(result.length).to.equal(0);
        });
    });
    describe("post", ()=>{
        beforeEach(async()=>{
            const transaction = await chatapp.connect(owner).addPost("Hello world .....");
            await transaction.wait();
        })
        it("post empty", async()=>{
            const transaction = await chatapp.connect(owner).addPost("");
            await transaction.wait();
        })
        it("post created", async()=>{
            const result = await chatapp.getPosts(owner.address);
            expect(result[0].likes).to.equal(0);
            expect(result[0].comments.length).to.equal(0);
            expect(result[0].content).to.equal("Hello world .....");
        })
        it("post liked", async()=>{
            await chatapp.connect(customer).likePost(owner.address, 0);
            const result = await chatapp.getPosts(owner.address);
            expect(result[0].likes).to.equal(1);
        })
    })
    describe("profile", async()=>{
        beforeEach(async ()=>{
            const transaction = await chatapp.connect(owner).createProfile(
                "Aryan Satija", 
                1,
                "Hello world",
                "Netaji subhas university of technology",
                "New Delhi",
                "",
                [],
                ""
            );
            await transaction.wait();
        });

        it("empty description update", async()=>{
            await chatapp.connect(owner).updateDesc("");
            
            expect(await chatapp.userProfiles[owner.address].description).to.equal("Hello world")
        })
    })
});
