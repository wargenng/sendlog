interface DrawerMainContentProps {
    children: React.ReactNode;
    isUploading?: boolean;
}

export default function DrawerMainContent({
    children,
    isUploading = false,
}: DrawerMainContentProps) {
    return (
        <div
            className={`flex flex-col gap-4 overflow-y-auto p-4 text-sm ${
                isUploading ? "pointer-events-none brightness-50" : ""
            }`}
        >
            {children}
        </div>
    );
}
