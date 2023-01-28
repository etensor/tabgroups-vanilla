#pragma once

#include <LedControl.h>
#include <vector>


class Matrixr {

    public:
    void printMap(
        LedControl& lc, 
        std::vector<std::vector<std::array<int,2>>>& positions,
        int delayTime = 1000,
        int brightness = 15,
        bool cclear = true);
    

    void moveForm(
        std::vector<std::vector<std::array<int,2>>>& positions,
        int a = 0,int x = 0, int y = 0);


    void moveMap(
        std::vector<std::vector<std::array<int,2>>>& positions,
        int x, int y);

    
    void breathMap(std::vector<std::vector<std::array<int,2>>>& positions, bool dir);



};