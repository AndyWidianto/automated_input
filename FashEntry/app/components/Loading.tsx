
interface LoadingProps {
    loading: boolean;
    text: string;
}
export default function Loading({ loading, text }: LoadingProps) {
    return loading ? <div className="flex items-center justify-center w-full gap-2">
        <div className="w-5 h-5 rounded-full border-3 border-gray-400 border-t-white animate-spin"></div>
        Processing
    </div> : text;
}