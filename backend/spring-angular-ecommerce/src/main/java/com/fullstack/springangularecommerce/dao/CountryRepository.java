package com.fullstack.springangularecommerce.dao;

import com.fullstack.springangularecommerce.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "countries",path = "countries")
@CrossOrigin
public interface CountryRepository extends JpaRepository<Country,Integer> {

}
