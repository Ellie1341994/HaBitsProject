from django.shortcuts import render

# Create your views here.

def appTitle(request):
    if request.method == "GET":
        return "HaBits"

    return "What are you trying to do?"
