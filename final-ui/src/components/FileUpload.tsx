import React, { useState, useCallback } from 'react';
import { Button, Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FileUploadProps {
    onFileUpload: (file: File) => void;
    accept: string;
    label: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, accept, label }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            onFileUpload(file);
            
            // Create preview for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                setPreview(null);
            }
        }
    }, [onFileUpload]);

    return (
        <Box mb={2}>
            <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                fullWidth
            >
                {label}
                <input
                    type="file"
                    accept={accept}
                    hidden
                    onChange={handleFileChange}
                />
            </Button>
            {preview && (
                <Box mt={2}>
                    <Typography variant="caption">Preview:</Typography>
                    <img 
                        src={preview} 
                        alt="Preview" 
                        style={{ 
                            maxWidth: '100%', 
                            maxHeight: '200px',
                            marginTop: '8px'
                        }} 
                    />
                </Box>
            )}
        </Box>
    );
};

export default FileUpload;