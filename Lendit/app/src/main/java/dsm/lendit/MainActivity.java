package dsm.lendit;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import io.realm.Realm;

public class MainActivity extends AppCompatActivity {

    Realm realm;
    TextView classroom, time, info;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ImageView applyIv = (ImageView) findViewById(R.id.toolbar_login_image);
        applyIv.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(getBaseContext(), ApplyListActivity.class);
                startActivity(i);
                finish();
            }
        });

        Realm.init(getApplicationContext());
        realm = Realm.getDefaultInstance();

        realm.beginTransaction();
        HistoryData historyData = realm.createObject(HistoryData.class);
        //historyData.setInfo();
        realm.commitTransaction();

        //classroom = (TextView) findViewById(R.id.classroom);
        //time = (TextView) findViewById(R.id.time);
        //info = (TextView) findViewById(R.id.info);
    }
}
