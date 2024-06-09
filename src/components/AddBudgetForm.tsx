import React, { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

function AddBudgetForm() {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    const formRef = React.useRef<HTMLFormElement>() as React.MutableRefObject<HTMLFormElement>;
    const focusRef = React.useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        if(!isSubmitting) {
            formRef.current?.reset();
            focusRef.current?.focus();
        }
    }, [isSubmitting]);

    return (
        <div className="form-wrapper">
            <h2 className="h3">Create budget</h2>
            
            <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input type="text" name="newBudget" id="newBudget" placeholder="e.g., Gloceries" required ref={focusRef} />
                </div>
                
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input type="number" step="0.01" name="newBudgetAmount" id="newBudgetAmount" placeholder="e.g. $350" required inputMode="decimal" ref={focusRef} />
                </div>

                <input type="hidden" name="_action" value="createBudget" />

                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Submiting budget...</span> : (
                            <>
                                <span>Create budget</span>
                                <CurrencyDollarIcon width={20} />
                            </>
                        )
                    }
                </button>
            </fetcher.Form>
        </div>
    );
}

export default AddBudgetForm;
