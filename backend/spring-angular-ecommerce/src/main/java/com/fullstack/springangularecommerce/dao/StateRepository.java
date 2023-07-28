package com.fullstack.springangularecommerce.dao;

import com.fullstack.springangularecommerce.entity.Country;
import com.fullstack.springangularecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;


@RepositoryRestResource
@CrossOrigin
public interface StateRepository extends JpaRepository<State,String> {

    List<State> findByCountryCode(@Param("code") String code);

}
