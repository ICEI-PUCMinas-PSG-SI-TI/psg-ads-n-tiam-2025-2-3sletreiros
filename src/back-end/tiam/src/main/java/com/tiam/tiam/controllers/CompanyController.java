package com.tiam.tiam.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tiam.tiam.models.Address;
import com.tiam.tiam.models.Company;
import com.tiam.tiam.services.CompanyService;

@RestController
@RequestMapping("api/company")
public class CompanyController {
    
    @Autowired
    CompanyService companyService;

    @PostMapping("/create")
    public void createCompany(@RequestBody Company company) {
        
        companyService.createCompany(company);
    }
}
