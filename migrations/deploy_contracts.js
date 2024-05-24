const decentralStore = artifacts.require("decentralStore");

module.exports = function (deployer) {
  deployer.deploy(FileStorage);
};
