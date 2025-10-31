package com.tiam.tiam.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import com.tiam.tiam.models.Product;
import com.tiam.tiam.repositories.ProductRepository;

public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product getProductById(UUID id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product updateProduct(UUID id, Product product) {
        if (!productRepository.existsById(id)) {
            return null;
        }
        product.setId(id);
        return productRepository.save(product);
    }

    public void deleteProduct(UUID id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
        }
    }

}
