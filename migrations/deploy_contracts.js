const DecentralStore = artifacts.require("DecentralStore");

module.exports = function (deployer) {
  deployer.deploy(FileStorage);
};
