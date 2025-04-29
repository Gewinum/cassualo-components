import "../styles/fileUpload.css";
import React from "react";
import {FaFileUpload} from "react-icons/fa";

type Props = {
    onFileSelect?: (file: File | null) => void;
    selectedFile?: File | null;
};

type State = {
    id: string;
    isDragging: boolean;
    file: File | null;
};

class FileUpload extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            id: `file-upload-${Math.random().toString(36).substr(2, 9)}`,
            isDragging: false,
            file: props.selectedFile || null,
        }
    }

    handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.setState({ isDragging: false });

        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            this.setState({ file });
            if (this.props.onFileSelect) {
                this.props.onFileSelect(file);
            }
        }
    };

    handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            this.setState({ file });
            if (this.props.onFileSelect) {
                this.props.onFileSelect(file);
            }
        }
    };

    render() {
        const { id, isDragging, file } = this.state;

        return (
            <div
                className={`file-upload ${isDragging ? "dragging" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={() => this.setState({ isDragging: false })}
                onDrop={this.handleDrop}
            >
                <input type="file" id={id} onChange={this.handleFileChange} />
                <label htmlFor={id}>
                    <FaFileUpload className="icon" />
                    <p>Drag your file here or <span>choose file</span></p>
                    {file ? <p className="file-name">Selected file: {file.name}</p> : <p className="file-name">Selected file: none</p>}
                </label>
            </div>
        );
    }
}

export default FileUpload;