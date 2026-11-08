
#include <HIRO.h>
#include <HIRO_Motion.h>
#include <HIRO_Functions.h>
#include <HIRO_Easy.h>

HIRO hiro;

// ==========================================
// TEST CONFIGURATION
// ==========================================

const int TEST_SPEED = 2;
const int TEST_STEPS = 1;
const int TEST_REPETITIONS = 2;

// Advanced movement parameters
const int STANCE = 0;
const int STEP = 60;
const int WALK_STRIDE = 25;
const int ROTATE_STRIDE = 20;
const int TRIM = 0;

// ==========================================
// SETUP
// ==========================================

void setup() {
  Serial.begin(9600);

  hiro.begin();
  neutralStance(hiro);

  // Allow time to open Serial Monitor
  delay(1500);

  Serial.println();
  Serial.println("================================");
  Serial.println("       HIRO MOTION TESTER");
  Serial.println("================================");

  printMenu();
}

// ==========================================
// MAIN LOOP
// ==========================================

void loop() {

  if (Serial.available() > 0) {

    String input = Serial.readStringUntil('\n');
    input.trim();

    if (input.length() == 0) {
      return;
    }

    // Validate the numeric command
    for (unsigned int i = 0; i < input.length(); i++) {
      if (input[i] < '0' || input[i] > '9') {
        Serial.println("Invalid input. Enter a number.");
        return;
      }
    }

    int command = input.toInt();

    executeCommand(command);
  }
}

// ==========================================
// MOVEMENT COMMAND HANDLER
// ==========================================

void executeCommand(int command) {

  if (command == 99) {
    printMenu();
    return;
  }

  if (command < 0 || command > 14) {
    Serial.println("Unknown command. Enter 99 for menu.");
    return;
  }

  Serial.println();
  Serial.print("Executing command: ");
  Serial.println(command);

  // Begin each test from neutral stance.
  neutralStance(hiro);

  switch (command) {

    case 0:
      Serial.println("Neutral Stance");
      break;

    case 1:
      Serial.println("Wave");
      wave(hiro);
      break;

    case 2:
      Serial.println("Side-to-Side Worm");
      sideToSideWorm(hiro, TEST_SPEED);
      break;

    case 3:
      Serial.println("Side-to-Side Stretch");
      sideToSideStretch(hiro, TEST_SPEED);
      break;

    case 4:
      Serial.println("Cabbage Patch");
      cabbagePatch(
        hiro, TEST_SPEED, TEST_REPETITIONS
      );
      break;

    case 5:
      Serial.println("Cabbage Patch 2");
      cabbagePatch2(
        hiro, TEST_SPEED, TEST_REPETITIONS
      );
      break;

    case 6:
      Serial.println("Push-ups");
      pushUps(
        hiro, TEST_SPEED, TEST_REPETITIONS
      );
      break;

    case 7:
      Serial.println("Easy Forward");
      easyForward(
        hiro, TEST_STEPS, TEST_SPEED
      );
      break;

    case 8:
      Serial.println("Easy Backward");
      easyBackward(
        hiro, TEST_STEPS, TEST_SPEED
      );
      break;

    case 9:
      Serial.println("Easy Clockwise");
      easyClockwise(
        hiro, TEST_STEPS, TEST_SPEED
      );
      break;

    case 10:
      Serial.println("Easy Counterclockwise");
      easyCounterClockwise(
        hiro, TEST_STEPS, TEST_SPEED
      );
      break;

    case 11:
      Serial.println("Advanced Forward");
      walkForward(
        hiro, STANCE, STEP,
        WALK_STRIDE, TEST_SPEED, TRIM
      );
      break;

    case 12:
      Serial.println("Advanced Backward");
      walkBackward(
        hiro, STANCE, STEP,
        WALK_STRIDE, TEST_SPEED, TRIM
      );
      break;

    case 13:
      Serial.println("Advanced Clockwise");
      rotateClockwise(
        hiro, STANCE, STEP,
        ROTATE_STRIDE, TEST_SPEED
      );
      break;

    case 14:
      Serial.println("Advanced Counterclockwise");
      rotateCounterClockwise(
        hiro, STANCE, STEP,
        ROTATE_STRIDE, TEST_SPEED
      );
      break;
  }

  Serial.println("Movement function returned.");
  Serial.println("Ready for next command.");
}

// ==========================================
// SERIAL MONITOR MENU
// ==========================================

void printMenu() {

  Serial.println();
  Serial.println("========= MOVEMENTS =========");
  Serial.println(" 0  - Neutral Stance");
  Serial.println(" 1  - Wave");
  Serial.println(" 2  - Side-to-Side Worm");
  Serial.println(" 3  - Side-to-Side Stretch");
  Serial.println(" 4  - Cabbage Patch");
  Serial.println(" 5  - Cabbage Patch 2");
  Serial.println(" 6  - Push-ups");
  Serial.println(" 7  - Easy Forward");
  Serial.println(" 8  - Easy Backward");
  Serial.println(" 9  - Easy Clockwise");
  Serial.println(" 10 - Easy Counterclockwise");

  Serial.println();
  Serial.println("====== ADVANCED MOTIONS ======");
  Serial.println(" 11 - Walk Forward");
  Serial.println(" 12 - Walk Backward");
  Serial.println(" 13 - Rotate Clockwise");
  Serial.println(" 14 - Rotate Counterclockwise");

  Serial.println();
  Serial.println(" 99 - Display Menu");
  Serial.println("=============================");
  Serial.println("Enter a command:");
}
