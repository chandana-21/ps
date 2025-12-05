import React, { useState } from 'react';
import ScanForm from '../components/ScanForm';
import { Camera, Save, Upload } from 'lucide-react';
import { db } from '../db';

const ScanView = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [processedImageUrl, setProcessedImageUrl] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setProcessedImageUrl(null);
            setAnalysisResult(null);
        }
    };

    const handleProcess = async () => {
        if (!selectedImage) {
            alert("Please upload an image first.");
            return;
        }

        setIsSaving(true);
        try {
            const formData = new FormData();
            formData.append('file', selectedImage);

            const response = await fetch('http://localhost:8000/process-image/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to process image');
            }

            const data = await response.json();
            setProcessedImageUrl(`http://localhost:8000${data.annotated_image_url}`);
            setAnalysisResult(data.analysis);

        } catch (error) {
            console.error('Failed to process scan:', error);
            alert(`Failed to process scan: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div className="card" style={{
                padding: 'var(--spacing-2xl)',
                borderRadius: 'var(--radius-xl)',
            }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
                    <div style={{
                        display: 'inline-flex',
                        padding: 'var(--spacing-md)',
                        backgroundColor: 'var(--color-info-bg)',
                        borderRadius: '50%',
                        color: 'var(--color-primary)',
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        <Camera size={32} />
                    </div>
                    <h2 className="font-bold" style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-sm)' }}>
                        AI Inventory Scan
                    </h2>
                    <p className="text-secondary">
                        Upload an image for AI-powered validation
                    </p>
                </div>

                <ScanForm />

                {/* Image Upload Section */}
                <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="image-upload"
                    />
                    <label htmlFor="image-upload" className="btn btn-secondary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <Upload size={20} />
                        Upload Image
                    </label>
                </div>

                {/* Preview and Result Section */}
                <div style={{ marginTop: 'var(--spacing-lg)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                    {previewUrl && (
                        <div>
                            <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Original Image</h4>
                            <img src={previewUrl} alt="Preview" style={{ width: '100%', borderRadius: 'var(--radius-lg)', maxHeight: '300px', objectFit: 'contain' }} />
                        </div>
                    )}
                    {processedImageUrl && (
                        <div>
                            <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Processed Image</h4>
                            <img src={processedImageUrl} alt="Processed" style={{ width: '100%', borderRadius: 'var(--radius-lg)', maxHeight: '300px', objectFit: 'contain' }} />
                        </div>
                    )}
                </div>

                {/* Analysis Result */}

                {analysisResult && (
                    <div style={{ marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md)', backgroundColor: '#f8f9fa', borderRadius: 'var(--radius-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--spacing-md)', fontWeight: 'bold' }}>Analysis Result</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                            <div className="card" style={{ padding: 'var(--spacing-md)', textAlign: 'center', backgroundColor: 'white' }}>
                                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Total Objects</div>
                                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                    {analysisResult.count_objects}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>Detected Items</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {Object.entries(analysisResult.predictions.reduce((acc, curr) => {
                                    acc[curr.class] = (acc[curr.class] || 0) + 1;
                                    return acc;
                                }, {})).map(([className, count]) => (
                                    <li key={className} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: 'var(--spacing-sm)',
                                        borderBottom: '1px solid var(--color-border)'
                                    }}>
                                        <span>{className}</span>
                                        <span style={{ fontWeight: 'bold' }}>{count}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div style={{ marginTop: 'var(--spacing-xl)', display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={handleProcess}
                        disabled={isSaving || !selectedImage}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: 'var(--spacing-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                        <Save size={20} />
                        {isSaving ? 'Processing...' : 'Process Image'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScanView;
