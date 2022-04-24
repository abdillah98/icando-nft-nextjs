import Link from 'next/link';
import Image from 'next/image';
import iconPlus from '../public/icons/icon-plus.svg';
import iconImage from '../public/icons/icon-image.svg';
import iconCategory from '../public/icons/icon-category.svg';
import iconLogout from '../public/icons/icon-logout.svg';
import imgInputFile from '../public/images/input-file.svg';

import { 
    TextField,
    TextArea,
    InputFile,
    Card
} from '../components/elements';

export default function Index() {
    return (
        <div className="container">
            <h1 className="mb-4">Create New Item</h1>
            <div className="row">
                <div className="col-md-8">
                    <Card>
                        <form>
                            <div className="row mb-5">
                                <div className="col-md-8">
                                    <InputFile
                                        label="Image"
                                        id="image"
                                        name="image"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-md-8">
                                    <TextField 
                                        id="name"
                                        name="name"
                                        label="Name"
                                        placeholder="Cute nft #01..."
                                        required
                                    />
                                </div>
                            </div>  
                            <div className="row mb-5">
                                <div className="col-md-12">
                                   <TextArea 
                                        id="description"
                                        name="description"
                                        label="Description"
                                        placeholder="Type your thoughts"
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-md-8">
                                    <TextArea 
                                         id="metadata"
                                         name="metadata"
                                         label="Metadata"
                                         placeholder="{...}"
                                         rows={6}
                                     />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary rounded-pill px-5">Save</button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
}
