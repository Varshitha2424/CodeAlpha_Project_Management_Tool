"""Notification worker for delivering in-app and email alerts."""

import time


def run_notifications():
    print('Notification worker started')
    while True:
        # placeholder for notification dispatch logic
        time.sleep(60)


if __name__ == '__main__':
    run_notifications()
