import React from 'react'
import './snackbar.css'

export default function Snackbar({ text }) {
    return (
        <div className="bar" id="bar">
            {text}
        </div>
    )
}
