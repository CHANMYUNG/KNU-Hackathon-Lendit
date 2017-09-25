package dsm.lendit;

import io.realm.RealmObject;

/**
 * Created by 10107PSH on 2017-09-01.
 */

public class HistoryData extends RealmObject{

    public HistoryData() {
        super();
    }

    private String classroom;
    private String time;
    private String info; //설명

    public String getClassroom() {
        return classroom;
    }

    public void setClassroom(String classroom) {
        this.classroom = classroom;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
