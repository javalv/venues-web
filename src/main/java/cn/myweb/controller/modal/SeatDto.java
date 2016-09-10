package cn.myweb.controller.modal;

/**
 * Created by lin on 16/9/10.
 */
public class SeatDto {


    int bStandId;
    String standName;
    int bBloorId;
    String floorName;
    int seatId;
    String seatName;
    float y;
    float x;

    public int getbStandId() {
        return bStandId;
    }

    public void setbStandId(int bStandId) {
        this.bStandId = bStandId;
    }

    public String getStandName() {
        return standName;
    }

    public void setStandName(String standName) {
        this.standName = standName;
    }

    public int getbBloorId() {
        return bBloorId;
    }

    public void setbBloorId(int bBloorId) {
        this.bBloorId = bBloorId;
    }

    public String getFloorName() {
        return floorName;
    }

    public void setFloorName(String floorName) {
        this.floorName = floorName;
    }

    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }

    public String getSeatName() {
        return seatName;
    }

    public void setSeatName(String seatName) {
        this.seatName = seatName;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }
}
