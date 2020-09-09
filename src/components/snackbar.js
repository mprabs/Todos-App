import React from 'react'
import './snackbar.css'

export default function snackbar({ text }) {
    return (
        <div className="bar" id="bar">
            {text}
        </div>
    )
}
