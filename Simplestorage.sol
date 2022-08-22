// SPDX-Licence-Identifier:MIT
pragma solidity 0.8.8;

contract DemoContract {
    uint256 favNumber;

    struct People {
        string name;
        uint256 age;
    }

    mapping(string => uint256) public namToage;

    //People public person = People("sammy",30);

    People[] public person;

    function set(uint256 num) public {
        favNumber = num;
    }

    function get() public view returns (uint256) {
        return favNumber;
    }

    function addPerson(string memory _name, uint256 _age) public {
        person.push(People(_name, _age));
        namToage[_name] = _age;
    }
}
