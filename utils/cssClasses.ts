function cssClasses(...classes: Array<string>) {
    return classes.filter(Boolean).join(' ');
}

export default cssClasses;
