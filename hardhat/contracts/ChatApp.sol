// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract chatapp {
    address public owner;

    event request_event(address from, address to);
    event Post_added(address author, string content, uint256 time);
    event like_added(address author);

    struct request {
        address from;
        address to;
        uint256 time;
    }

    struct Post {
        uint256 id;
        address author;
        string content;
        string image; 
        uint256 time;
        uint256 likes;
        string[] comments;
        address[] users_liked;
    }   

    struct Profile{
        string name;
        bool pronoun; // 1 -> male, 0 -> female
        string description;
        string organisation;
        string lives;
        string about;
        string[] skills;
        string image;
    }

    mapping(address => Profile) public userProfile;
    mapping(address => address[]) friends;
    mapping(address => request[]) friendRequest;
    mapping(address => Post[]) posts;
    
    constructor() {
        owner = msg.sender;
    }

    modifier nonEmpty(string memory text) {
        require(bytes(text).length > 0, "empty text");
        _;
    }
    
    function sendFriendRequest(address to) external {
        request memory newRequest = request({
            from: msg.sender,
            to: to,
            time: block.timestamp
        });
        friendRequest[to].push(newRequest);
        
        friendRequest[msg.sender].push(newRequest);

        emit request_event(msg.sender, to);
    }
    
    function getAllRequests(address user) external view returns(request[] memory){
        return friendRequest[user];
    }

    function getRequestIndex1(address from_, address to_) internal view returns(uint256){
        for(uint256 i = 0; i < friendRequest[to_].length; i++){
            if(friendRequest[to_][i].from == from_){
                return i;
            }
        }
        return friendRequest[to_].length;
    }

    function getRequestIndex2(address from_, address to_) internal view returns(uint256){
        for(uint256 i = 0; i < friendRequest[from_].length; i++){
            if(friendRequest[from_][i].to == to_){
                return i;
            }
        }
        return friendRequest[from_].length;
    }

    function removeFriendRequest(address user, uint index) internal {
        require(index < friendRequest[user].length, "Invalid request index.");
        for (uint i = index; i < friendRequest[user].length - 1; i++) {
            friendRequest[user][i] = friendRequest[user][i + 1];
        }
        friendRequest[user].pop();
    }

    function rejectFriendRequest(address user) external {
       uint index1 = getRequestIndex1(user, msg.sender);
       removeFriendRequest(msg.sender, index1);
       uint index2 = getRequestIndex2(user, msg.sender);
       removeFriendRequest(user, index2);
    }

    function acceptFriendRequest(address user) external {
       uint index1 = getRequestIndex1(user, msg.sender);
       removeFriendRequest(msg.sender, index1);
       uint index2 = getRequestIndex2(user, msg.sender);
       removeFriendRequest(user, index2);
       friends[user].push(msg.sender);
       friends[msg.sender].push(user);
    }

    function addPost(string memory content, string memory image) external {
        require(bytes(content).length > 0, "content must not be empty");
        string[] memory comments = new string[](0);
        address[] memory users_liked = new address[](0);
        Post memory newPost = Post({
            id: posts[msg.sender].length,
            author: msg.sender,
            content: content,
            image: image,
            time: block.timestamp,
            likes: 0,
            comments: comments,
            users_liked: users_liked
        });
        posts[msg.sender].push(newPost);
        emit Post_added(msg.sender, content, newPost.time);
    }
    function getPosts(address user) external view returns(Post[] memory){
        return posts[user];
    }

    function likePost(address author, uint256 id) external {
        posts[author][id].likes += 1;
        posts[author][id].users_liked.push(msg.sender);
    }

    function createProfile(string memory _name, bool _pronoun, 
    string memory _description, string memory _organisation,
    string memory _lives, string memory _about, string[] memory _skills, 
    string memory _image) external {
        userProfile[msg.sender] = Profile({
            name: _name,
            pronoun: _pronoun,
            description: _description,
            organisation: _organisation,
            lives: _lives,
            about: _about,
            skills: _skills,
            image: _image
        });
    }
    function updateDesc(string memory _description) nonEmpty(_description) external {
        userProfile[msg.sender].description = _description;
    }
    function updateProfile(string memory _name, string memory _lives, string memory _organisation, string memory _about) nonEmpty(_about) external {
        userProfile[msg.sender].name = _name;
        userProfile[msg.sender].lives = _lives;
        userProfile[msg.sender].organisation = _organisation;
        userProfile[msg.sender].lives = _lives;
    }
    function updateSkills(string memory _newSkill) nonEmpty(_newSkill) external {
        userProfile[msg.sender].skills.push(_newSkill);
    }
    function getUserProfile(address user) external view returns(Profile memory) {
        return userProfile[user];
    }
}


