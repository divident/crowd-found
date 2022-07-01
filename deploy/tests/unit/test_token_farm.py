from brownie import network, exceptions
from deploy.scripts.constants import LOCAL_BLOCKCHAIN_ENVIRONMENTS
from deploy.scripts.deploy import deploy
from deploy.scripts.utils import get_account
import pytest
from web3 import Web3

import time
import datetime


def test_launch_campaign():
    # Arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing")
    account = get_account()
    non_owner = get_account(index=1)
    crowd_found, dapp_token = deploy()

    start_at, end_at = datetime.date(2022,7,20), datetime.date(2022,7,22)

    start_at_timestamp = time.mktime(start_at.timetuple())
    end_at_timestamp = time.mktime(end_at.timetuple())

    # Act
    crowd_found.launch(100, start_at_timestamp, end_at_timestamp)


    # Assert
    assert crowd_found.campaigns(1) == ('0x66aB6D9362d4F35596279692F0251Db635165871', 100, 0, start_at_timestamp, end_at_timestamp, False)

    
    