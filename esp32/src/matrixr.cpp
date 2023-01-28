#include "matrixr.h"

void Matrixr::printMap(
        LedControl& lc, 
        std::vector<std::vector<std::array<int,2>>>& positions,
        int delayTime,
        int brightness, 
        bool cclear)    {


    lc.setIntensity(0,brightness);
    for (auto vec : positions) {
        for (auto pos : vec) {
        lc.setLed(0,pos[0],pos[1],1);
        }
        delay(delayTime);
        if (cclear) lc.clearDisplay(0);

    }
    lc.clearDisplay(0);

}

void Matrixr :: moveForm(
        std::vector<std::vector<std::array<int,2>>>& positions,
        int a ,int x, int y ) {

    for (auto &pos : positions[a]) {
        pos[0] += x;
        pos[1] += y;
    }


}

void Matrixr :: moveMap(
        std::vector<std::vector<std::array<int,2>>>& positions,
        int x, int y
        ) {

    for (auto &vec : positions) {
        for (auto &pos : vec) {
            pos[0] += x;
            pos[1] += y;
        }
    }

}

void Matrixr :: breathMap(  
    std::vector<std::vector<std::array<int,2>>>& positions,
    bool dir = false
) {
    if (dir){
        for (auto &vec : positions) {
            for (auto &pos : vec) {
                if (pos[0] < 3) pos[0] += 1;
                if (pos[1] < 3) pos[1] += 1;
                if (pos[0] > 4) pos[0] -= 1;
                if (pos[1] > 4) pos[1] -= 1;

            }
        }
    }
    else {
        for (auto &vec : positions) {
            for (auto &pos : vec) {
                if (pos[0] < 3) pos[0] -= 1;
                if (pos[1] < 3) pos[1] += 1;
                if (pos[0] > 4) pos[0] += 1;
                if (pos[1] > 4) pos[1] -= 1;

            }
        }
    }
}
