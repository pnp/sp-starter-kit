// this interface defines a redirection item
export interface IRedirection {
    // defines the relative URL of the source page to redirect from
    sourceRelativeUrl: string;
    // defines the relative or absolute URL of the destination page to redirect to
    destinationUrl: string;
    // declares whether the redirection is enabled or not
    enabled: boolean;
}