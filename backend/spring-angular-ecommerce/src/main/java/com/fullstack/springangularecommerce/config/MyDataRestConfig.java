package com.fullstack.springangularecommerce.config;

import com.fullstack.springangularecommerce.entity.Country;
import com.fullstack.springangularecommerce.entity.Product;
import com.fullstack.springangularecommerce.entity.ProductCategory;
import com.fullstack.springangularecommerce.entity.State;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import jakarta.persistence.metamodel.EntityType;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {


    private EntityManager entityManage;

    @Autowired
    public MyDataRestConfig(EntityManager entityManager){
        this.entityManage=entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {




        HttpMethod [] theUnsupportedActions={HttpMethod.PUT,HttpMethod.DELETE,HttpMethod.POST,HttpMethod.PATCH};

        disableHttpMethods(config.getExposureConfiguration().forDomainType(Product.class), theUnsupportedActions);
        disableHttpMethods(config.getExposureConfiguration().forDomainType(ProductCategory.class), theUnsupportedActions);
        disableHttpMethods(config.getExposureConfiguration().forDomainType(Country.class), theUnsupportedActions);
        disableHttpMethods(config.getExposureConfiguration().forDomainType(State.class), theUnsupportedActions);

        exposesIds(config);

    }

    private static void disableHttpMethods(ExposureConfigurer config, HttpMethod[] theUnsupportedActions) {
        config
                     .withItemExposure((metadata,httpMethods)-> httpMethods.disable(theUnsupportedActions))
                     .withCollectionExposure((metadata,httpMethods)-> httpMethods.disable(theUnsupportedActions));
    }

    //    very important
    private void exposesIds(RepositoryRestConfiguration config) {

        Set<EntityType<?>> entities=entityManage.getMetamodel().getEntities();

        List<Class> entityClasses=new ArrayList<>();

        for(EntityType en:entities){
            entityClasses.add(en.getJavaType());
        }

        Class [] domainTypes= entityClasses.toArray(new Class[0]);

        config.exposeIdsFor(domainTypes);


    }
}
