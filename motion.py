import time
import board
import digitalio
import os
import subprocess

# CE1 on Raspberry Pi 4B is GPIO7 / physical pin 26
signal_pin = digitalio.DigitalInOut(board.CE1)
signal_pin.direction = digitalio.Direction.INPUT

# Optional pull resistor.
# Use PULL_DOWN if the signal goes HIGH when active.
# Use PULL_UP if the signal goes LOW when active.
signal_pin.pull = digitalio.Pull.DOWN

last_value = signal_pin.value

print("Listening on CE1 / GPIO7 / physical pin 26...")

try:
    while True:
        current_value = signal_pin.value

        if current_value != last_value:
            if current_value:
                print("Signal went HIGH on CE1")
                os.chdir("/home/josh/dev/daiquiri/harness")
                os.system("pnpm run cli")
            else:
                print("Signal went LOW on CE1")

            last_value = current_value

        time.sleep(0.01)

except KeyboardInterrupt:
    print("\nStopping listener.")

finally:
    signal_pin.deinit()