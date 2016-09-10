package cn.myweb.controller.rest;

import cn.myweb.controller.modal.AreaDto;
import cn.myweb.controller.modal.SeatDto;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/venues")
public class VenuesRest {

    private static String SEATKEY = "seats";
    private static String AREAKEY = "areas";
    private static Map<String, Object> cache = new HashMap<String, Object>();

    @RequestMapping(value = "/getSeats", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String getSeats(HttpServletRequest request, String standId) {

        List<SeatDto> list = new ArrayList<SeatDto>();
        if (cache.isEmpty()) {
            try {
                init();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        int sId = Integer.valueOf(standId);
        list = getSeatDtoList(sId);
        //座位中心点
        float[][] seatPoints = new float[list.size()][2];
        int i = 0;
        for(SeatDto dto:list){
            float[] p = new float[2];
            p[0] = dto.getX();
            p[1] = dto.getY();
            seatPoints[i++] = p;
        }
        float[] center_seats = calculateCenter(seatPoints);


        AreaDto areaDto = getAreaDto(sId);
        String rc = areaDto.getRc();
        String[] temps = rc.split("[\\|]");
        float[][] areaPoints = new float[temps.length][2];
        i = 0;
        for(String temp : temps){
            float[] p = new float[2];
            p[0] = Float.valueOf(temp.split(",")[0]);
            p[1] = Float.valueOf(temp.split(",")[1]);
            areaPoints[i++] = p;
        }
        float[] center_area = calculateCenter(areaPoints);

        translate(seatPoints,center_seats,center_area);

        return toJson(seatPoints);

    }

    @RequestMapping(value = "/getAreas", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String getAreas(HttpServletRequest request) {

        if (cache.isEmpty()) {
            try {
                init();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return toJson(cache.get(AREAKEY));

    }

    private void init() throws Exception{
        List<SeatDto> seatDtos = getSeatDtoList();

        cache.put(SEATKEY,new HashMap<Integer,List<SeatDto>>());
        cache.put(AREAKEY,new ArrayList<AreaDto>());
        for(SeatDto seatDto:seatDtos){
            int standId = seatDto.getbStandId();
            HashMap<Integer,List<SeatDto>> seatMap = (HashMap<Integer,List<SeatDto>>)cache.get(SEATKEY);
            List<SeatDto> seatDtoList = seatMap.get(standId);
            if(seatDtoList==null){
                seatDtoList = new ArrayList<SeatDto>();
                seatMap.put(standId,seatDtoList);
            }
            seatDtoList.add(seatDto);
        }

        List<AreaDto> areaDtos = getAreaDtoList();
        cache.put(AREAKEY,areaDtos);
    }

    private List<SeatDto> getSeatDtoList() throws IOException{
        String json = getJson("seats");
        return getList(json,SeatDto.class);
    }

    private List<SeatDto> getSeatDtoList(int standId){
        return ((HashMap<Integer,List<SeatDto>>)cache.get(SEATKEY)).get(standId);
    }

    private List<AreaDto> getAreaDtoList() throws IOException{
        String json = getJson("areas");
        return getList(json,AreaDto.class);
    }

    private AreaDto getAreaDto(int standId){
        List<AreaDto> list = (List<AreaDto>)cache.get(AREAKEY);
        for(AreaDto dto : list){
            if(dto.getStandId() == standId){
                return dto;
            }
        }
        return null;
    }

    /**
     * 坐标转换
     *
     * @param points       每个区域的原始坐标点
     * @param center_seats 座位点中心点
     * @param center_area  区域轮廓点中心点
     */
    private void translate(float[][] points, float[] center_seats, float[] center_area) {

        float translate_x = center_area[0] - center_seats[0];
        float translate_y = center_area[1] - center_seats[1];

        for (float[] point : points) {
            point[0] += translate_x;
            point[1] += translate_y;
        }
    }

    /**
     * 计算中心点
     *
     * @param points
     * @return
     */
    private float[] calculateCenter(float[][] points) {

        float[] max = {Float.MIN_VALUE, Float.MIN_VALUE};
        float[] min = {Float.MAX_VALUE, Float.MAX_VALUE};

        for (float[] point : points) {
            float x = point[0];
            float y = point[1];

            if (x > max[0]) {
                max[0] = x;
            }
            if (y > max[1]) {
                max[1] = y;
            }
            if (x < min[0]) {
                min[0] = x;
            }
            if (y < min[1]) {
                min[1] = y;
            }
        }

        float center_x = (max[0] + min[0]) / 2;
        float center_y = (max[1] + min[1]) / 2;

        return new float[]{center_x, center_y};
    }


    private String getJson(String key) {
        StringBuffer str = new StringBuffer();
        BufferedReader fb = null;
        String url = "/data" + "/" + key + ".json";
        try {

            InputStream in = this.getClass().getResourceAsStream(url);

            Reader f = new InputStreamReader(in, "utf-8");
            fb = new BufferedReader(f);
            String s = "";
            while ((s = fb.readLine()) != null) {
                str = str.append(s);
            }
            return str.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (fb != null) {
                try {
                    fb.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private static String toJson(Object obj){
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(obj);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static <T>List<T> getList(String json,Class<T> tClass) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JavaType javaType = getCollectionType(mapper,ArrayList.class, tClass);
        return  (List<T>)mapper.readValue(json, javaType);
    }

    private static JavaType getCollectionType(ObjectMapper mapper,Class<?> collectionClass, Class<?>... elementClasses) {
        return mapper.getTypeFactory().constructParametricType(collectionClass, elementClasses);
    }
}
