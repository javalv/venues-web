package cn.myweb.controller.web;

import cn.myweb.controller.rest.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class PayController {

    @RequestMapping("alipay/toPay.do")
    public String toPay(@RequestParam(value = "token") String token,
                        @RequestParam(value = "orderId") String orderId,
                        HttpServletRequest request) {

        if (checkToken(token,orderId))
        {
            request.getSession().setAttribute("token", token);
        }else {
            return "error";
        }

        return "alipay";
    }

    @RequestMapping("/alipay/payResult.do")
    public String result(HttpServletRequest request) {

        String token = (String) request.getSession().getAttribute("token");

        if (token == null) {
            //暂时简单判断，需要判断是否和用户授权token一致
            return "error";
        }

        return "payResult";
    }

    //判断token是否和订单ID是否对应
    private boolean checkToken(String token,String orderId) {
        return true;
    }

}
