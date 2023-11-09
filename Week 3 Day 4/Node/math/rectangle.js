class Rectangle{

    areaOfRectangle(length, width){
        return length * width;
    }
    perimeterOfRectangle(length, width){
        return 2*(length + width);
    }
}


module.exports = new Rectangle();