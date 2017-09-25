package dsm.lendit;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Collections;

public class ApplyListActivity extends AppCompatActivity {

    private ListView mListView = null;
    private ListViewAdapter mAdapter = null;

    private class ViewHolder {
        public TextView mText;

        public ImageView mIcon;
    }

    private class ListViewAdapter extends BaseAdapter {
        private Context mContext = null;
        private ArrayList<ListData> mListData = new ArrayList<ListData>();

        public ListViewAdapter(Context mContext) {
            super();
            this.mContext = mContext;
        }

        @Override
        public int getCount() {
            return mListData.size();
        }

        @Override
        public Object getItem(int position) {
            return mListData.get(position);
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            ViewHolder holder;
            if (convertView == null) {
                holder = new ViewHolder();

                LayoutInflater inflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
                convertView = inflater.inflate(R.layout.listview_item, null);

                holder.mIcon = (ImageView) convertView.findViewById(R.id.imageView);
                holder.mText = (TextView) convertView.findViewById(R.id.first_choice);

                convertView.setTag(holder);
            }else{
                holder = (ViewHolder) convertView.getTag();
            }

            ListData mData = mListData.get(position);

            if (mData.mIcon != null) {
                holder.mIcon.setVisibility(View.VISIBLE);
                holder.mIcon.setImageDrawable(mData.mIcon);
            }else{
                holder.mIcon.setVisibility(View.GONE);
            }

            holder.mText.setText(mData.mText);

            return convertView;
        }

        public void addItem(Drawable icon, String mText){
            ListData addInfo = null;
            addInfo = new ListData();
            addInfo.mIcon = icon;
            addInfo.mText = mText;

            mListData.add(addInfo);
        }

        public void sort(){
            Collections.sort(mListData, ListData.ALPHA_COMPARATOR);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_apply_list);

        mListView = (ListView) findViewById(R.id.mList);

        mAdapter = new ListViewAdapter(this);
        mListView.setAdapter(mAdapter);

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "서울특별시");

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "경기도");

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "강원도");

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "충청남도");

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "충청북도");

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "전라남도");

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "전라북도");

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "경상남도");

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "경기북도");

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "인천");

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "대전");

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "대구");

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "광주");

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "부산");

        mAdapter.addItem(getResources().getDrawable(R.drawable.apply),
                "제주도");
    }
}
