export interface Props {
    preloader: boolean;
    progress: number;
    loaders: string[];
    toggleSidebarAction: (num: number | boolean) => void;
}

export interface Context {
    preloaderRef: any; 
    onChangeSlideIndex: (bool: boolean) => void;
    closeSidebar: () => void;
}
