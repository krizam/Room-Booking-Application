package com.example.roombookingsystembackend;

import com.example.roombookingsystembackend.Entity.Category;
import com.example.roombookingsystembackend.Repo.CategoryRepo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CategoryTest {

    @Autowired
    private CategoryRepo categoryRepo;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveCategoryTest() {
        Category category = new Category();
        category.setName("TestCategory");

        categoryRepo.save(category);

        Assertions.assertThat(category.getId()).isNotNull();
    }

    @Test
    @Order(2)
    public void getCategoryTest() {
        Category savedCategory = categoryRepo.findAll().get(0);
        Category retrievedCategory = categoryRepo.findById(savedCategory.getId()).orElse(null);

        Assertions.assertThat(retrievedCategory).isNotNull();
        Assertions.assertThat(retrievedCategory.getId()).isEqualTo(savedCategory.getId());
    }

    @Test
    @Order(3)
    public void getListOfCategoriesTest() {
        List<Category> categories = categoryRepo.findAll();
        Assertions.assertThat(categories.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateCategoryTest() {
        Category category = categoryRepo.findAll().get(0);
        category.setName("UpdatedCategory");
        Category updatedCategory = categoryRepo.save(category);

        Assertions.assertThat(updatedCategory.getName()).isEqualTo("UpdatedCategory");
    }

    @Test
    @Order(5)
    @Rollback(value = false)
    public void deleteCategoryTest() {
        List<Category> categories = categoryRepo.findAll();
        Category categoryToDelete = categories.get(0);
        categoryRepo.delete(categoryToDelete);

        Optional<Category> optionalCategory = categoryRepo.findById(categoryToDelete.getId());
        Assertions.assertThat(optionalCategory).isEmpty();
    }
}
