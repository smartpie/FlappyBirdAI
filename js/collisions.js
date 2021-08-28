function circleRect(cx, cy, radius, rx, ry, rw, rh) {

    testX = cx;
    testY = cy;

    if (cx < rx)         testX = rx;      // test left edge
    else if (cx > rx+rw) testX = rx+rw;   // right edge
    if (cy < ry)         testY = ry;      // top edge
    else if (cy > ry+rh) testY = ry+rh;   // bottom edge

    distX = cx-testX;
    distY = cy-testY;
    distance = sqrt( (distX*distX) + (distY*distY) );

    if (distance <= radius) {
        return true;
    }
    return false;
}
