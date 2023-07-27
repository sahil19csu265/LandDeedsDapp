// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    struct will 
    {
        string text;
        uint256 propertyID;
    }

    mapping (address => will) public wills;

    constructor() ERC721("Land Deeds", "LDHG") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function transferNFT(address from,address to,uint256 tokenId) public {
        
        _transfer(from, to, tokenId);
    }

    function updateNFT(uint256 tokenId,address recepient,string memory tokenURI) public{
        _burn(tokenId);
        _mint(recepient,tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function createWill(address creater,uint256 id,string memory text) public 
    { 
        wills[creater].propertyID = id;
        wills[creater].text = text;

    }

    function viewWill(address creater) view public returns (uint256, string memory ) 
    {
        return (wills[creater].propertyID,wills[creater].text);
    }
}


