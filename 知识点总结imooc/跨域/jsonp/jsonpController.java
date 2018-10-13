package com.yonyougov.dmp.manager.controller;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.yonyougov.dmp.manager.service.home.IHomeService;
import com.yonyougov.dmp.manager.vo.home.CzsbFactJsSzfkmgkVO;

@Controller
@RequestMapping(value = "/home")
public class HomeController {
	
	@Autowired
	private IHomeService homeService;
	
	/**
	 * 获取首页-收入、支出、收支结余数据
	 */
	@RequestMapping(method = RequestMethod.GET,value="getIncomeAndExpend")
	public @ResponseBody Object getIncomeAndExpend(HttpServletRequest request,HttpServletResponse response) {
		response.setContentType("text/javascript");
//		PrintWriter out = null;
		Gson gson = new Gson();
		String xzqhDM = request.getParameter("xzqhDM");
		String callback = request.getParameter("callback");
		try {
//			out=response.getWriter();
			Map<String, String> resultMap = homeService.getIncomeAndExpend(xzqhDM);
			String data = gson.toJson(resultMap);
//			out.write(callback+"("+resultMap+")");
			return callback+"("+data+")";
		} catch(Exception e) {
			e.printStackTrace();
			HashMap<String, String> errorMap = new HashMap<String, String>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}
	
}
