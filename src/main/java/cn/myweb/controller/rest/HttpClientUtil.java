package cn.myweb.controller.rest;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;

import java.io.*;
import java.util.Map;

/**
 * Created by f on 2016/1/8.
 */
public class HttpClientUtil {
    //private static String url = "http://220.249.1.50:8085";
    private static String url = "http://api.yglpin.com";
//    private static String url = "http://192.168.1.48:8082/";
//    private static String url = "http://192.168.1.58:8081";

    public static String request(String uri, Map<String, Object> params) throws Exception {
      /*  // 创建HttpClient实例
        HttpClient httpclient = new DefaultHttpClient();*/

        String allUrl = url + "" + uri + "?";

        return requestByFullUrl(allUrl, params);

        /*for(String key : params.keySet()){
            allUrl = allUrl + key + "=" + ((String[])params.get(key))[0] + "&";
        }

        // 创建Get方法实例
        HttpGet httpGets = new HttpGet(allUrl);


        HttpResponse response = httpclient.execute(httpGets);
        HttpEntity entity = response.getEntity();

        InputStream ins = entity.getContent();

        String CHARSET = "UTF-8";
        if (entity != null) {
            BufferedReader br = null;
            try{
                br = new BufferedReader(new InputStreamReader(ins,CHARSET));
                StringBuffer sbf = new StringBuffer();
                String line = null;
                while ((line = br.readLine()) != null)
                {
                    sbf.append(line);
                }
                return sbf.toString();
            }finally {
                if(br != null){
                    br.close();
                }

            }

        }

        return null;*/
    }

    public static String requestByFullUrl(String uri, Map<String, Object> params) throws Exception {
        // 创建HttpClient实例
        HttpClient httpclient = new DefaultHttpClient();

        String allUrl = uri;
        for (String key : params.keySet()) {
            allUrl = allUrl + key + "=" + ((String[]) params.get(key))[0] + "&";
        }
        allUrl = allUrl.substring(0, allUrl.length() - 1);


        // 创建Get方法实例
        HttpGet httpGets = new HttpGet(allUrl);


        HttpResponse response = httpclient.execute(httpGets);
        HttpEntity entity = response.getEntity();

        InputStream ins = entity.getContent();

        String CHARSET = "UTF-8";
        if (entity != null) {
            BufferedReader br = null;
            try {
                br = new BufferedReader(new InputStreamReader(ins, CHARSET));
                StringBuffer sbf = new StringBuffer();
                String line = null;
                while ((line = br.readLine()) != null) {
                    sbf.append(line);
                }
                return sbf.toString();
            } finally {
                if (br != null) {
                    br.close();
                }

            }

        }

        return null;
    }

    public static String postRequestByFullUrl(String uri, Map<String, Object> params) throws Exception {
        // 创建HttpClient实例
        HttpClient httpclient = new DefaultHttpClient();

        String allUrl = uri;
        for (String key : params.keySet()) {
            allUrl = allUrl + key + "=" + ((String[]) params.get(key))[0] + "&";
        }

        // 创建Get方法实例
        HttpPost httpGets = new HttpPost(allUrl);


        HttpResponse response = httpclient.execute(httpGets);
        HttpEntity entity = response.getEntity();

        InputStream ins = entity.getContent();

        String CHARSET = "UTF-8";
        if (entity != null) {
            BufferedReader br = null;
            try {
                br = new BufferedReader(new InputStreamReader(ins, CHARSET));
                StringBuffer sbf = new StringBuffer();
                String line = null;
                while ((line = br.readLine()) != null) {
                    sbf.append(line);
                }
                return sbf.toString();
            } finally {
                if (br != null) {
                    br.close();
                }

            }

        }

        return null;
    }

    public static String convertStreamToString(InputStream is) {
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        StringBuilder sb = new StringBuilder();

        String line = null;
        try {
            while ((line = reader.readLine()) != null) {
                sb.append(line + "\n");
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                is.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        try {
            return new String(sb.toString().getBytes(), "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }

}
