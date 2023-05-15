import \
    os

import \
    jwt
from rest_framework import \
    permissions

from api.models import \
    User

class HasEditPermissionOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        user = request.user
        if user.is_staff:
            return True
        if user.is_active and user == obj.user:
            return True

        return False

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_superuser

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        user = request.user
        return user.is_superuser

