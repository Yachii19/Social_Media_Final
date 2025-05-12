package com.vinuya.socialmedia.controller;

import com.vinuya.socialmedia.dto.CreatePostRequest;
import com.vinuya.socialmedia.dto.PostResponse;
import com.vinuya.socialmedia.dto.UpdatePostRequest;
import com.vinuya.socialmedia.service.FileStorageService;
import com.vinuya.socialmedia.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/vinuya/posts")
public class PostController {

    private final PostService postService;
    private final FileStorageService fileStorageService;

    @Autowired
    public PostController(PostService postService, FileStorageService fileStorageService) {
        this.postService = postService;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<PostResponse>> createBulkPosts(
            @RequestBody List<CreatePostRequest> requests) {

        if (requests == null || requests.isEmpty()) {
            throw new IllegalArgumentException("Request body must contain at least one post");
        }

        List<PostResponse> responses = new ArrayList<>();

        for (CreatePostRequest request : requests) {
            // Validate each request
            if (request.getContent() == null || request.getContent().trim().isEmpty()) {
                throw new IllegalArgumentException("Post content cannot be empty");
            }

            // Only allow URL-based media (no file uploads in bulk)
            if (request.getImageFile() != null || request.getVideoFile() != null) {
                throw new IllegalArgumentException("Bulk upload only supports image/video URLs, not file uploads");
            }

            PostResponse response = postService.createPost(
                    request.getContent(),
                    request.getImageUrl(),
                    request.getVideoUrl()
            );
            responses.add(response);
        }

        return ResponseEntity.ok(responses);
    }

    @PostMapping(consumes = {"multipart/form-data", "application/json"})
    public ResponseEntity<PostResponse> createPost(
            @RequestPart(value = "request", required = false) CreatePostRequest jsonRequest,
            @ModelAttribute(value = "request") CreatePostRequest formRequest,
            @RequestPart(value = "imageFile", required = false) MultipartFile jsonImageFile,
            @RequestPart(value = "videoFile", required = false) MultipartFile jsonVideoFile
    ) throws IOException {
        // Determine which request to use (JSON or form-data)
        CreatePostRequest request = jsonRequest != null ? jsonRequest : formRequest;
        if (request == null) {
            throw new IllegalArgumentException("Request body is required");
        }

        // Handle files from either source
        MultipartFile imageFile = formRequest != null ? formRequest.getImageFile() : jsonImageFile;
        MultipartFile videoFile = formRequest != null ? formRequest.getVideoFile() : jsonVideoFile;

        String imageUrl = request.getImageUrl();
        String videoUrl = request.getVideoUrl();

        if (imageFile != null && !imageFile.isEmpty()) {
            String filename = fileStorageService.storeFile(imageFile);
            imageUrl = "/uploads/" + filename;
        }

        if (videoFile != null && !videoFile.isEmpty()) {
            String filename = fileStorageService.storeFile(videoFile);
            videoUrl = "/uploads/" + filename;
        }

        PostResponse response = postService.createPost(
                request.getContent(),
                imageUrl,
                videoUrl
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data", "application/json"})
    public ResponseEntity<PostResponse> updatePost(
            @PathVariable Long id,
            @RequestPart(value = "request", required = false) UpdatePostRequest jsonRequest,
            @ModelAttribute(value = "request") UpdatePostRequest formRequest,
            @RequestPart(value = "imageFile", required = false) MultipartFile jsonImageFile,
            @RequestPart(value = "videoFile", required = false) MultipartFile jsonVideoFile
    ) throws IOException {
        // Determine which request to use (JSON or form-data)
        UpdatePostRequest request = jsonRequest != null ? jsonRequest : formRequest;
        if (request == null) {
            throw new IllegalArgumentException("Request body is required");
        }

        // Handle files from either source
        MultipartFile imageFile = formRequest != null ? formRequest.getImageFile() : jsonImageFile;
        MultipartFile videoFile = formRequest != null ? formRequest.getVideoFile() : jsonVideoFile;

        String imageUrl = request.getImageUrl();
        String videoUrl = request.getVideoUrl();

        if (imageFile != null && !imageFile.isEmpty()) {
            String filename = fileStorageService.storeFile(imageFile);
            imageUrl = "/uploads/" + filename;
        }

        if (videoFile != null && !videoFile.isEmpty()) {
            String filename = fileStorageService.storeFile(videoFile);
            videoUrl = "/uploads/" + filename;
        }

        PostResponse response = postService.updatePost(
                id,
                request.getContent(),
                imageUrl,
                videoUrl
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePost(@PathVariable Long id) {
        postService.deletePost(id);

        // Create a success message
        Map<String, String> response = new HashMap<>();
        response.put("message", "Post with ID " + id + " has been deleted successfully.");

        // Return the success message
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<PostResponse> likePost(@PathVariable Long id) {
        return ResponseEntity.ok(postService.likePost(id));
    }
}