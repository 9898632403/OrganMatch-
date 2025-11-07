// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OrganLedger {
    struct MatchRecord {
        string donor;
        string recipient;
        string organ;
        string status;
        string compatibility;
        string timestamp;
    }

    MatchRecord[] private records;
    address public admin;

    event RecordAdded(
        string donor,
        string recipient,
        string organ,
        string status,
        string compatibility,
        string timestamp
    );

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can add records");
        _;
    }

    function addRecord(
        string memory donor,
        string memory recipient,
        string memory organ,
        string memory status,
        string memory compatibility,
        string memory timestamp
    ) public onlyAdmin {
        records.push(
            MatchRecord(donor, recipient, organ, status, compatibility, timestamp)
        );
        emit RecordAdded(donor, recipient, organ, status, compatibility, timestamp);
    }

    function getAllRecords() public view returns (MatchRecord[] memory) {
        return records;
    }

    function getRecordCount() public view returns (uint256) {
        return records.length;
    }
}
