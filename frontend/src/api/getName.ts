import axios from 'axios';

export default class GetName {
    private readonly apiUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    // Note to developer & Ansari:
    // This should be written as static function, but I want to keep it as a class method for now
    // so that I could demonstrate class instantiation and method calling in the frontend (please see its usage).
    // For actual production code, it would be better to make this a static method.
    // - Joshua Barbosa
    public async fetchName(): Promise<string> {
        try {
            const response = await axios.get(`${this.apiUrl}/api/test`);
            return response.data.name;  
        }
        catch (error) {
            console.error('Error fetching name:', error);
            throw error;
        }
    }
}