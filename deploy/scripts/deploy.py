from brownie import CrowdFund, DappToken, network, config
from scripts.utils import get_account
import shutil
import json
import yaml
from web3 import Web3
import os

KEPT_BALANCE = Web3.toWei(100, "ether")


def deploy():
    account = get_account()
    dapp_token = DappToken.deploy({"from": account})

    print(config["networks"][network.show_active()])
    crowd_found = CrowdFund.deploy(dapp_token.address, {"from": account},
            publish_source=config["networks"][network.show_active()]["verify"])
    
    tx = dapp_token.transfer(
        account.address,
        dapp_token.totalSupply() - KEPT_BALANCE,
        {"from": account},
    )

    tx.wait(1)

    return crowd_found, dapp_token


def main():
    deploy()
