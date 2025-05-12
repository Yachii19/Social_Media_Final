    package com.vinuya.socialmedia.service;

    import com.vinuya.socialmedia.dto.PostResponse;
    import com.vinuya.socialmedia.exception.ResourceNotFoundException;
    import com.vinuya.socialmedia.model.Post;
    import com.vinuya.socialmedia.repository.PostRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.List;
    import java.util.stream.Collectors;

    @Service
    public class PostService {

        private final PostRepository postRepository;

        @Autowired
        public PostService(PostRepository postRepository) {
            this.postRepository = postRepository;
        }

        public List<PostResponse> getAllPosts() {
            return postRepository.findAllByOrderByCreatedAtDesc()
                    .stream()
                    .map(this::mapToPostResponse)
                    .collect(Collectors.toList());
        }

        public PostResponse getPostById(Long id) {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));
            return mapToPostResponse(post);
        }

        public PostResponse createPost(String content, String imageUrl, String videoUrl) {
            Post post = new Post();
            post.setContent(content);
            post.setImageUrl(imageUrl);
            post.setVideoUrl(videoUrl);

            Post savedPost = postRepository.save(post);
            return mapToPostResponse(savedPost);
        }

        public PostResponse updatePost(Long id, String content, String imageUrl, String videoUrl) {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));

            post.setContent(content);
            post.setImageUrl(imageUrl);
            post.setVideoUrl(videoUrl);

            Post updatedPost = postRepository.save(post);
            return mapToPostResponse(updatedPost);
        }

        public void deletePost(Long id) {
            if (!postRepository.existsById(id)) {
                throw new ResourceNotFoundException("Post not found with id: " + id);
            }
            postRepository.deleteById(id);
        }

        public PostResponse likePost(Long id) {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));

            post.setLikes(post.getLikes() + 1);
            Post likedPost = postRepository.save(post);
            return mapToPostResponse(likedPost);
        }

        private PostResponse mapToPostResponse(Post post) {
            PostResponse response = new PostResponse();
            response.setId(post.getId());
            response.setContent(post.getContent());
            response.setImageUrl(post.getImageUrl());
            response.setVideoUrl(post.getVideoUrl());
            response.setLikes(post.getLikes());
            response.setCreatedAt(post.getCreatedAt());
            response.setUpdatedAt(post.getUpdatedAt());
            return response;
        }
    }